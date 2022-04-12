import json

def tsv_to_json(input_file,output_file):
    print("hello")
    arr=[]
    file=open(input_file,'r')
    # a=file.readline()


    titles=["orig_fr","gold_en","trans_human","score_human","trans_neural","score_neural","trans_stat","score_stat"]
    id=0
    for line in file:
        d={}
        d["id"]=id
        id=id+1
        for t,f in zip(titles,line.split('\t')):
            d[t]=f.strip()
        arr.append(d)

    with open(output_file,'w', encoding="utf-8") as output_file:
        
        output_file.write(json.dumps(arr, indent=4))
        print("running")

input_fname='./samplefr2enall.tsv'
output_fname='ouput.json'

tsv_to_json(input_fname,output_fname)