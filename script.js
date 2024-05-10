const base_url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropDown select")
const btn= document.querySelector("form button")
const fromcur= document.querySelector(".from select")
const tocur= document.querySelector(".to select")
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(curcode in countryList){
            let newOption = document.createElement("option");
            newOption.innerText = curcode;
            newOption.value=curcode;
            if (select.name=== "from" && curcode==="USD"){
                newOption.selected="selected";
            }
            else if (select.name=== "to" && curcode==="INR"){
                newOption.selected="selected";
            }
            select.append(newOption)

            
        }
        select.addEventListener("change",(evt)=>{
                updateFlag(evt.target);
        })
}

const updateFlag= (element)=>{
    let curcode= element.value;
    // console.log(curcode);
    let countryCode= countryList[curcode];
    let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;

}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExcRate();
})


const updateExcRate= async()=>{
    let amount= document.querySelector(".amount input");
    let amtval=amount.value;
    console.log(amtval);
    if(amtval===""|| amtval<1)
        {
            amtval=1;
            amount.value=1;
        }
    // console.log(fromcur.value, tocur.value)
        const url=`${base_url}/${fromcur.value.toLowerCase()}.json`
        let response= await fetch(url);
        
        // console.log(response )
        let data= await response.json();
        // console.log(data )
        let rate= data[fromcur.value.toLowerCase()] [tocur.value.toLowerCase()];
        // console.log(rate)
        let finalAmt= amtval*rate;
        msg.innerText= `${amtval}${fromcur.value}= ${finalAmt}${tocur.value}`
}
    window.addEventListener("load",()=>{
    updateExcRate();
    })