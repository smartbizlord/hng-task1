const http = require("http")
const url = require("url")
const current_day = require("./utils/getDayOfWeek")()
const utc_time = require("./utils/getUTCTime")
const setQuery = require("./utils/setReqQuery")
const server = http.createServer((req, res) => {
    const hostIndex = req.rawHeaders.findIndex((value) => value == "Host") + 1
    const endpointFull= new URL(`http://${req.rawHeaders[hostIndex]}${req.url}`)
    setQuery(endpointFull.searchParams, req)

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Accept", "application/json")

    if (endpointFull.pathname == "/api" && req.method == "GET") {
        // 
        if (req.query?.slack_name == undefined || req.query?.track == undefined) {
            // 
            res.statusCode = 400
            res.end(JSON.stringify({ error: "Bad Request" }))
        } else{
            // 
            const {slack_name, track} = req.query;
            const response = {
                slack_name,
                current_day,
                utc_time,
                track,
                github_file_url: "https://github.com/smartbizlord/hng-task1/blob/main/index.js",
                github_repo_url: "https://github.com/smartbizlord/hng-task1",
                status_code: 200,
            }
            res.end(JSON.stringify(response));
        }
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ error: "Not Found" }))
    }
})









server.listen(4000, () => console.log("running"))