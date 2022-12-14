import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Write the high level points for a blog post with the title below\nTitle:\n";
const generateAction = async (req, res) => {

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 1000,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = "Take the high level points and title of the linkedin post below and generate a  post. Make it feel like a story. Don't just list points. Go deep into each one. Explain why.\nTitle:" + req.body.userInput + "\nHigh level points:" +
    basePromptOutput.text + "\n + Post:\n";

  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.85,
    max_tokens: 2000,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();
  const postInfo = req.body.userInput + "\n" + basePromptOutput.text +
  "\n" + secondPromptOutput.text
  res.status(200).json({ output: postInfo });
};

export default generateAction;