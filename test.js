import { mailTransporter } from "./mailSetting.js";

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project Assign</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 100%;
    }
    .head {
      width: 100%;
      height: 40px;
      background-color: rgb(166, 241, 241);
      text-align: center;
      padding: 20px 10px 0 0;
    }
    .body {
      display: inline-flex;
      max-width: 100%;
      width: 100%;
      background-color: rgb(247, 240, 231);
      
    }
    .body .partOne {
        width: 45%;
        padding: 20px;
    }
    .body .partTwo {
        width: 45%;
        padding: 20px;
    }
    label {
      font-weight: 700;
      font-size: 18px;
    }
    span {
      font-weight: 400;
      font-size: 16px;
    }
    ol li {
      list-style: none;
      line-height: 30px;
    }
    .footer {
      width: 100%;
      height: 20px;
      background-color: rgb(166, 241, 241);
      text-align: center;
      padding: 10px 10px 0 0;
    }
  </style>
  <body>
    <div class="container">
      <div class="head">
        <h3>Project Assigned</h3>
      </div>
      <div class="body">
        <div class="partOne">
          <ol>
            <li><label for="">Project Name : </label> <span>Test</span></li>
            <li>
              <label for="">Project Manager : </label> <span>Test Manager</span>
            </li>
            <li><label for="">Task : </label> <span>Test Task</span></li>
            <li>
              <label for="">Task Completation: </label>
              <span>02 May 2023 07:00 PM</span>
            </li>
          </ol>
        </div>
        <div class="partTwo">
            <div class="title" style="margin: 10px 0;">
                <h3>Project Description</h3>
            </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            optio ad. Blanditiis, soluta accusantium. Eum iste suscipit, unde
            inventore aliquam aut cum illum eligendi ad quas voluptas deleniti
            eaque quasi.
          </p>
        </div>
      </div>

      <div class="footer">
        <h5>&copy; Click UP</h5>
      </div>
    </div>
  </body>
</html>
`;
let mailDetails = {
  from: "vijay.amule@techinfini.com",
  to: "vijay.amule@techinfini.com",
  subject: "Test mail",
  html: html,
};

mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log("Error Occurs", err);
  } else {
    console.log("Email sent successfully");
  }
});