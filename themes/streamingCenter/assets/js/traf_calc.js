function calculate_bw() {

    var bitrate = document.getElementById('quality');
    var period = document.getElementById('period');
    var sum_m = document.getElementById('sum_m');
    var sum_g = document.getElementById('sum_g');
    var count = document.getElementById('listeners');
    var netspeed = document.getElementById('netspeed_m');
    var netspeed_k = document.getElementById('netspeed_k');
		    
    if ((bitrate) && (period) && (sum_m) && (sum_g) && (count) && (netspeed)) {
				
        var m = 3600 * bitrate.value / 8192 * period.value * count.value;
        var g = 3600 * bitrate.value / 8192/1024 * period.value * count.value;
        var n = bitrate.value * count.value / 1024 ;
        var nk = bitrate.value * count.value ;
        m = ' '+m;
        g = ' '+g;
        n = ' '+n;
        nk = ' '+nk;
	
        if (m.indexOf(".") != -1) {
            sum_m.innerHTML = m.substring(1,m.indexOf(".")+3);
        }
        else {
            sum_m.innerHTML = m.substring(1,100);
        }
        
        if (g.indexOf(".") != -1) {
            sum_g.innerHTML = g.substring(1,g.indexOf(".")+3);
        }
        else {
            sum_g.innerHTML = g.substring(1,100);
        }
        
        if (n.indexOf(".") != -1) {
            netspeed.innerHTML = n.substring(1,n.indexOf(".")+3);
        }
        else {
            netspeed.innerHTML = n.substring(1,100);
        }
                                                
        if (nk.indexOf(".") != -1) {
            netspeed_k.innerHTML = nk.substring(1,nk.indexOf(".")+3);
        }
        else {
            netspeed_k.innerHTML = nk.substring(1,100);
        }								
    }
}

document.addEventListener('DOMContentLoaded', function() {

    document.body.addEventListener("change", function(e) {
        calculate_bw();
    });
    calculate_bw();

});