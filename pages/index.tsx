import { Button, Container, Dropdown, Label, Message } from "semantic-ui-react";
import { useState } from "react";
import { predict } from "../services/predict";
import { symptoms } from "../const/const";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [predictRes, setPredictRes] = useState("");

  const handleClick = async () => {
    setLoading(true);
    const res = await predict(symptom);
    setPredictRes(res);
    setLoading(false);
  };

  return (
    <Container style={{"width": "300px", "height": "80vh", "position": "relative"}}>
      <div style={{"position": "absolute", "top" : "50%", "width": "100%"}}>
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <Label style={{"margin": "0"}}>Select your symptom: </Label>
          <Dropdown
            deburr
            search
            selection
            placeholder="Symptom"
            onChange={(_, d) => setSymptom(d.value as string)}
            options={symptoms.map((v) => {
              return { key: v, text: v, value: v };
            })}
          ></Dropdown>
          <Button disabled={loading} loading={loading} onClick={handleClick} style={{"margin": "20px 0"}}>
            Predict
          </Button>
        </div>
        <Label>Result: </Label>
        <Message error={predictRes.includes("Error")} style={{"margin" : "0", "padding": "0", "height": "36px"}}>
          <p style={{"height": "100%", "lineHeight": "36px", "padding": "0 10px"}}>{predictRes}</p>
        </Message>
      </div>
    </Container>
  );
}
