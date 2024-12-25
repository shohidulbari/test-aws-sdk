import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import express from "express";
import multer from "multer";

const app = express();
const upload = multer();

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const s3 = new S3({
    region: "us-east-1",
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
    },
  });

  await new Upload({
    client: s3,
    params: {
      Key: `test/${Date.now()}.jpeg`, // Todo: Fix
      Body: req.file.buffer,
      Bucket: "fulflld-assets",
    },
  }).done();
  return res.status(200).send("OK");
});

app.listen(3333, () => {
  console.log("server is listening");
});
