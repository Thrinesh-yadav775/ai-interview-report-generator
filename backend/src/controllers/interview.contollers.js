const prisma = require("../lib/db");
const pdfparser = require("pdf-parse");
const generateinterviewreport = require("../services/ai.service");
async function createdata(req, res) {
  try {
    const { selfdescription, jobdescription } = req.body;
    if(!selfdescription||!jobdescription||!req.file){
      return res.status(400).json({message:"all fileds are required"})
    }
    const content = await pdfparser(req.file.buffer);
    const interviewreportbyai = await generateinterviewreport({
      resume: content.text,
      selfdescription: selfdescription,
      jobdescritption: jobdescription,
    });
    const interviewreport = await prisma.Interviewreport.create({
      data: {
        userId: req.user.id,
        resume: content.text,
        selfdescription,
        jobdescription,
        matchscore: interviewreportbyai.matchscore,
        technicalQuestions: { create: interviewreportbyai.technicalquestion },
        behaviouralQuestions: { create: interviewreportbyai.behaviouralquestion },
        skillGaps: { create: interviewreportbyai.skillgap },
        preparationPlans: { create: interviewreportbyai.Preparationplan },
      },
      include: {
        technicalQuestions: true,
        behaviouralQuestions: true,
        skillGaps: true,
        preparationPlans: true,
      },
    });
    res.status(200).json({ message: "report generated succesfully", interviewreport });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message || "error generating report" });
  }
}
async function getlatest(req, res) {
  const report = await prisma.Interviewreport.findFirst({
    where: { userId: req.user.id },
    orderBy: { id: "desc" },
    include: {
      technicalQuestions: true,
      behaviouralQuestions: true,
      skillGaps: true,
      preparationPlans: true,
    },
  });
  res.status(200).json({ report });
}

module.exports = { createdata, getlatest };
