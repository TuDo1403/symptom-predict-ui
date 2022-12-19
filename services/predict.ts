
type Data = {
    results: string[]
}

export const predict = async (inputs: string) => {
    const data = await fetch('https://anprovip209.pythonanywhere.com/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify({ inputs }),
    })
        .then(res => res.json())
        .then((data) => {
            const res = data as Data
            console.log({ res: res.results[0] })
            return res.results[0]
        })
        .catch(err => { console.log(err); return "Error" });

    return data
}