import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });

      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <main className="main">
      <div className="w-2/4 mx-auto">
      <pre className="result mb-5">{result}</pre>
        <textarea type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Merhaba Nasıl Yardımcı Olabilirim?" className="textarea"></textarea>
        <button onClick={handleClick} disabled={loading || prompt.length === 0} className="btn">
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </div>
    </main>
  );
}

export default App;
