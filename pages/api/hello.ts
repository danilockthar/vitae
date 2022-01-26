import { htmlSetter } from "../../lib/html-setter";

const chromium = require("chrome-aws-lambda");
var jwt = require("jsonwebtoken");

export default async (req, res) => {
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page.setContent(
    htmlSetter(
      req.body.template,
      req.body.personalInfo,
      req.body.experiences,
      req.body.education,
      req.body.skills
    )
  );
  const pdf = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
    format: "A4",
  });
  await browser.close();
  res.setHeader("Content-Type", "application/pdf");
  res.status(200).json({ pdf });

  // try {
  //   await page.goto(`${process.env.BASEURL}/api/preview?name=${encrypted}`, {
  //     waitUntil: "networkidle2",
  //   });
  //   await page.waitForSelector("#pdf-wrapper-page", {
  //     visible: true,
  //     timeout: 5000,
  //   });
  //   const pdf = await page.pdf({
  //     pageRange: "1 - 2",
  //     format: "A4",
  //     printBackground: true,
  //   });

  //   await browser.close();
  //   res.setHeader("Content-Type", "application/pdf");
  //   res.status(200).json({ pdf });
  // } catch (e) {
  //   console.log("errors");
  //   res.status(400).json({ data: { failed: true } });
  // }

  // if (e instanceof TimeoutError) {
  //   console.log("errors");
  //   res.status(400).json({ data: { failed: true } });
  // }

  // output to a local file

  // const htmlContent = `<!DOCTYPE html>
  // <html>
  // <head>
  // <title>Title of the document</title>
  // </head>

  // <body>
  // <div class="wrapper">
  // <h1>${req.body.name} </h1>
  // </div>
  // </body>
  // <style>
  // body{
  //   margin:0;
  //   padding:0;
  //   box-sizing:border-box;
  // }
  // .wrapper{
  //   background:dodgerblue;
  // }
  // </style>
  // </html>`;
  // await page.setContent(htmlContent);
  // go to page in resumeonly mode, wait for any network events to settle

  // await page.goto("http://localhost:3000/", {
  //   waitUntil: "networkidle2",
  // });
  // // output to a local file
  // const pdf = await page.pdf({
  //   pageRange: "1 - 2",
  //   format: "A4",
  //   printBackground: true,
  // });
  // // close
  // await browser.close();
  // res.setHeader("Content-Type", "application/pdf");
  // res.status(200).json({ pdf });
};
