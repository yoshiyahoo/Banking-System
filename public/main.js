function getData() {
    fetch("http://localhost:3000/api/getAccounts", {
        method: "GET"
    })
        .then((data) => {
            console.log(data)
        })
}
