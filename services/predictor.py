import json
import click
import pickle
import numpy as np
import pandas as pd

@click.command()
@click.option('--input', '-i', required=True, help='Input to the model')
def cli(input):
    df_pivoted = pd.read_csv('public/data.csv')
    symptoms = df_pivoted.columns[1:].values

    with open('public/NB_model.sav', 'rb') as input_file:
        model = pickle.load(input_file)
    user_symptoms = list(input.split(','))
    test_input = [0]*397
    for symptom in user_symptoms:
        test_input[np.where(symptoms==symptom)[0][0]] = 1

    data = json.dumps({'results': model.predict([test_input]).tolist()}, indent=4, ensure_ascii=False)
    return data
    # with open('public/result.json', 'w', encoding='utf8') as output_file:
    #     data = json.dumps({'results': model.predict([test_input]).tolist()}, indent=4, ensure_ascii=False)
    #     output_file.write(data)

if __name__ == '__main__':
    cli()
