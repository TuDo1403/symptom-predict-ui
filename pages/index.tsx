import { Button, Container, Dropdown, Image, Label, Message } from "semantic-ui-react";
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
        <Container
            style={{ width: "300px", height: "80vh", position: "relative" }}
        >
            <div style={{ position: "absolute", top: "40%", width: "100%" }}>
                <Image src="/images/logo.png" style={{"width": "100px", "margin": "20px auto"}}></Image>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ margin: "0" }}>
                        Lựa chọn các triệu chứng:{" "}
                    </Label>
                    <Dropdown
                        deburr
                        multiple
                        search
                        selection
                        placeholder="Triệu chứng"
                        onChange={(_, d) => {
                            console.log((d.value as string[]).join(","));
                            setSymptom((d.value as string[]).join(","));
                        }}
                        options={symptoms.map((v) => {
                            return { key: v, text: v, value: v };
                        })}
                    ></Dropdown>
                    <Button
                        disabled={loading}
                        loading={loading}
                        onClick={handleClick}
                        style={{ margin: "20px 0" }}
                    >
                        Chẩn đoán
                    </Button>
                </div>
                <Label>Kết quả chẩn đoán: </Label>
                <Message
                    error={predictRes.includes("Lỗi!")}
                    style={{ margin: "0", padding: "0", height: "36px" }}
                >
                    <p
                        style={{
                            height: "100%",
                            lineHeight: "36px",
                            padding: "0 10px",
                        }}
                    >
                        {predictRes}
                    </p>
                </Message>
            </div>
        </Container>
    );
}
