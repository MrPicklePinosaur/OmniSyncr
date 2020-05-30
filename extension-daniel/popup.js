
document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('play-button');
    
    btn.addEventListener('click', function(){
        var debug = document.getElementById('text-debug');
        debug.textContent = 'working';
    });
});