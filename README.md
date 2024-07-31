# Nestjs Minio S3 Example

This project demonstrates how to get, list, and upload files to and from Minio using NestJS.

## Description

This example project is designed to help developers get started with integrating Minio, an S3-compatible object storage service, with a NestJS application. It provides basic functionalities such as uploading files, listing files, and retrieving files from Minio.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rsoutar/nestjs-minio-s3-example.git
   cd nestjs-minio-s3-example
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add your Minio configuration:

   ```env
   MINIO_ENDPOINT=<your-minio-endpoint>
   MINIO_PORT=443
   MINIO_ACCESS_KEY=<your-minio-access-key>
   MINIO_SECRET_KEY=<your-minio-secret-key>
   MINIO_BUCKET=<your-bucket-name>
   ```

4. Start the application:
   ```bash
   npm run start
   ```

## Usage

Once the application is running, you can use the provided endpoints to interact with Minio:

- **Upload a file:** `POST /upload`
- **List files:** `GET /files`
- **Get a file:** `GET /files/:filename`

Refer to the code and comments for more details on how to use these endpoints.

## Contributing

No contributions are needed as this is an example project for those who need to get started with Minio and NestJS.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to contact me on X (Twitter) [@neomatic](https://twitter.com/neomatic).
