API_KEYS = "***REMOVED***"
import openai
openai.api_key = API_KEYS



# config
temperature = 0.9
max_tokens = 300
top_p = 1.0
best_of = 1
frequency_penalty = 0.0
presence_penalty = 0.6

# stop = ["You:"]
stop = ["\n"]

def send_question(openai: any, messages: list[dict]) -> str:
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )

    return completion.choices[0].message.content

def run_openai_chatbot(question,history):

    messages = history
    messages.append({
        'role': 'user',
        'content': question
    })

    answer = send_question(openai,messages)
    messages.append({
        'role': 'assistant',
        'content': answer
    })

    return answer,messages


# run_openai_chatbot("plz wirte a new novel based on following words? surffing, apple, alien, earth",'')
# run_openai_chatbot("what time is it?",'')

if __name__=="__main__":
    print(1)