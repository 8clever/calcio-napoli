declare module "heroku-client" {
  class Client {
    constructor({ token: string }) 

    async delete(uri: string);
  }
  export default Client;
}