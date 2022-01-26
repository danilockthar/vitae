import { getPostByID } from "../../graphql/api";

export default async (req, res) => {
  //   console.log(req.body.name, "req name");
  const response = await getPostByID("2971667425730237482");
  if (response._id !== null) {
    res.setPreviewData(response);
    res.redirect("/cv/resume");
  } else {
    return;
  }
};
