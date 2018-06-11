vcl 4.0;
backend default {
    .host = "varnish_backend";
	.port = "80";
}


sub vcl_recv {
    # Happens before we check if we have this in cache already.
    #
    # Typically you clean up the request here, removing cookies you don't need,
    # rewriting the request, etc.
  set req.http.X-Client-IP = client.ip;


  if ( req.url  ~ "bundle" ) {
    unset req.http.Cache-Control;
    unset req.http.Pragma;
    return(hash);
  }

  return(pass);
}

# former vcl_fetch
sub vcl_backend_response {
    # Happens after we have read the response headers from the backend.
    #
    # Here you clean the response headers, removing silly Set-Cookie headers
    # and other mistakes your backend does.


 set beresp.ttl = 5m;

 set beresp.grace = 1h;

 if (beresp.status == 301) {
    set beresp.ttl = 10m;
 }

 if (beresp.status == 404 || beresp.status == 500) {
    set beresp.ttl = 30s;
}

 if (beresp.http.content-type ~ "^(text|application)/.+") {
   set beresp.do_gzip = true;
 }

 return(deliver);

}

sub vcl_deliver {
    # Happens when we have all the pieces we need, and are about to send the
    # response to the client.
    #
    # You can do accounting or modifying the final object here.
        if (obj.hits > 0) {
                set resp.http.X-Cache = "HIT from nginx-trips";
        } else {
                set resp.http.X-Cache = "MISS from nginx-trips";
        }
    set resp.http.Access-Control-Allow-Origin = "*";
}
