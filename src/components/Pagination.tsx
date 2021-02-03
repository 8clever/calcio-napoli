import { useRouter } from "next/router"
import { stringify } from "querystring";
import { Anchor } from "./Hybrid";
import { theme } from "./Theme"

export const makeUrl = (route: string, query: any) => {
  let url = route;
  const q: any = {};
  Object.keys(query).forEach(key => {
    const p = `[${key}]`;
    if (url.includes(p)) {
      url = url.replace(p, query[key]);
      return;
    }
    q[key] = query[key];
  });
  return `${url}?${stringify(q)}`;
}

export interface PaginationProps {
  limit: number;
  page: number;
  totalCount: number;
}

export const Pagination = (props: PaginationProps) => {
  const router = useRouter();
  const currentCount = props.page * props.limit;
  return (
    <>
      <div className="pagination">
        {
          Number(router.query.page) > 1 ?
          <Anchor 
            href={makeUrl(router.route, {
              ...router.query,
              page: (Number(router.query.page) || 1) - 1
            })}
            className="prev button">
            Pagina precedente
          </Anchor> : null
        }
        { 
          props.totalCount > currentCount ?
          <Anchor
            href={makeUrl(router.route, {
              ...router.query,
              page: (Number(router.query.page) || 1) + 1
            })}
            className="next button">
            Pagina successiva
          </Anchor> : null
        }
      </div>
      <style jsx>{`
        .pagination {
          display: flex;
          margin-bottom: 15px;
        }
        .pagination :global(.button) {
          border-radius: 4px;
          border: 1px solid ${theme.color.white};
          margin-right: 15px;
          text-decoration: none;
          padding: 20px;
          transition: all 0.3s;
          color: ${theme.color.white};
        }
        .pagination :global(.button:hover) {
          background-color: ${theme.color.white};
          color: ${theme.color.black};
        }
      `}</style>
    </>
  )
}