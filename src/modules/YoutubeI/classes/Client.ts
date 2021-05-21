import { I_END_POINT, WATCH_END_POINT } from "../constants";
import { getQueryParameter, HTTP } from "../common";

import { Playlist, Video, SearchResult, LiveVideo } from ".";
import { SearchResultType } from "./SearchResult";

/** Youtube Client */
export default class Client {
	/** @hidden */
	http: HTTP;
	/** @hidden */
	options: Client.ClientOptions;

	constructor(options: Partial<Client.ClientOptions> = {}) {
		this.options = {
			hl: "en",
			gl: "US",
			cookie: "",
			...options,
		};
		this.http = new HTTP(this);
	}

	/**
	 * Searches for videos / playlists / channels
	 *
	 * @param query The search query
	 * @param searchOptions Search options
	 *
	 */
	async search<T extends Client.SearchOptions>(
		query: string,
		searchOptions?: Partial<T>
	): Promise<SearchResult<T>> {
		const options: Client.SearchOptions = {
			type: "all",
			...searchOptions,
		};

		const result = new SearchResult();
		await result.init(this, query, options);
		return result;
	}

	/**
	 * Search for videos / playlists / channels and returns the first result
	 *
	 * @return Can be {@link VideoCompact} | {@link PlaylistCompact} | {@link Channel} | `undefined`
	 */
	async findOne<T extends Client.SearchOptions>(
		query: string,
		searchOptions?: Partial<T>
	): Promise<SearchResultType<T> | undefined> {
		return (await this.search(query, searchOptions)).shift();
	}

	/** Get playlist information and its videos by playlist id or URL */
	async getPlaylist(playlistIdOrUrl: string): Promise<Playlist | undefined> {
		const playlistId = getQueryParameter(playlistIdOrUrl, "list");

		const response = await this.http.post(`${I_END_POINT}/browse`, {
			data: { browseId: `VL${playlistId}` },
		});

		if (response.data.error || response.data.alerts) return undefined;
		return new Playlist({ client: this }).load(response.data);
	}

	/** Get video information by video id or URL */
	async getVideo<T extends Video | LiveVideo | undefined>(videoIdOrUrl: string): Promise<T> {
		const videoId = getQueryParameter(videoIdOrUrl, "v");

		const response = await this.http.get(`${WATCH_END_POINT}`, {
			params: { v: videoId, pbj: "1" },
		});

		if (!response.data[3].response.contents) return undefined as T;
		return (!response.data[2].playerResponse.playabilityStatus.liveStreamability
			? new Video({ client: this }).load(response.data)
			: new LiveVideo({ client: this }).load(response.data)) as T;
	}
}

export namespace Client {
	export type SearchType = "video" | "channel" | "playlist" | "all";

	export type SearchOptions = {
		/** Search type, can be `"video"`, `"channel"`, `"playlist"`, or `"all"` */
		type: SearchType;
	};

	export type ClientOptions = {
		cookie: string;
		/** 2-chars language code for localization */
		hl: string;
		/** 2-chars country code  */
		gl: string;
	}
}