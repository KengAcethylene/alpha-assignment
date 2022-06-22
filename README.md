# Query ETH value in USD on Single account

---

## How to use this API

- create `.env` file. key based on `.env.example`
- install dependency with command
  ```sh
  yarn
  ```
- start server with command
  ```sh
  yarn start:dev
  ```
- use url `http://localhost:3000/getAddressValue/[ethaddress]` example `http://localhost:3000/getaddressValue/0x60B83824B040141dAe8695e8718131c075d0a0Ed`

  - if address is correct. the result will be status 200 with format
    ```json
    {
      "usd" : price(string with 2 decimals)
    }
    ```
    Example
    ```json
    {
      "usd": "84.96"
    }
    ```
  - if address is incorrect. the result will be status 400 with format

    ```json
    {
      "statusCode": 400,
      "message": ["invalid address"],
      "error": "Bad Request"
    }
    ```

  - for other error such as network error. the result will be status 400 with format
    ```json
    {
      "statusCode": 400,
      "message": "something went wrong",
      "error": "Bad Request"
    }
    ```
