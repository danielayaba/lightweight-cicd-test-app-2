module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('index'); // index view file is rendered when HTTP GET '/' called
    });

    // The deployment pipeline polls this route to decide whether a *new*
    // container is serving traffic: uptimeSeconds comes from the process
    // itself, so a value younger than the deploy trigger proves the
    // replacement is live rather than the previous version still answering.
    app.get('/health', function(req, res){
        res.json({
            status: 'healthy',
            uptimeSeconds: Math.floor(process.uptime())
        });
    });
}