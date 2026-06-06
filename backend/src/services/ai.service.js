const Groq=require('groq-sdk')
const {z}=require('zod')
const groq=new Groq({
    apiKey:process.env.GroqAPIkey
})
const interviewreportschema=z.object({
    matchscore:z.number().describe("give a score how well a candidate is between o to 100"),
    technicalquestion:z.array(z.object({
        question:z.string().describe("the technical question can be asked in the interview"),
        intention:z.string().describe("the intention of the intervwier behind the question"),
        answer:z.string().describe("how to answer this question,what points to cover,what approach to take")
    })).describe("behavioural questions that can be asked in the interview along with the technical questions"),
    behaviouralquestion:z.array(z.object({
        question:z.string().describe("the technical question can be asked in the interview"),
        intention:z.string().describe("the intention of the intervwier behind the question"),
        answer:z.string().describe("how to answer this question,what points to cover,what approach to take")
    })).describe("behavioural questions that can be asked in the interview along with the technical questions"),
    skillgap:z.array(z.object({
        skill:z.string().describe("the skill which the candiadte is lacking"),
        severity:z.enum(["low","medium","high"])
    })).describe("list of skill gaps in the candidate's profile along with theire severity"),
    Preparationplan:z.array(z.object({
        day:z.number().describe("the day number in the preparation plan ,starting from 1"),
        focus:z.string().describe('the main focus of the day in the preparation'),
        tasks:z.array(z.string().describe("list of tasks to be done ont his specific day"))
    })).describe('a day wise plan for the candiadates to follow in the the preparation')
})
async function genratereport({resume,selfdescription,jobdescritption}){
    const prompt=`generate an interview report for a candidate with following details:Resume:${resume},selfdescribe:${selfdescription},jobdescribe:${jobdescritption}`
    const response=await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        messages:[{role:"user",content:prompt}],
        response_format:{type:"json_object"}
    })
    return JSON.parse(response.choices[0].message.content)
}
module.exports=genratereport
