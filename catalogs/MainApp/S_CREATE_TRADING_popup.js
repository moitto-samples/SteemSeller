var __current_coin_price = null;

function on_loaded() {
    __get_coin_price("KRW", "SBD", 1, function(price) {
        __current_coin_price = price;

        __update_coin_amount();
    });
}

function show_qr(form) {
	var coin = form["amount"];
    var currency = form["amount"];

	if ($data["amount-type"] === "KRW") {
		coin = (coin / __current_coin_price).toFixed(3);
	} else {
        currency = "";
    }

	controller.catalog().submit("showcase", "auxiliary", "S_QRCODE", {
		"has-own-sbml":"yes",
		"username":$data["username"],
		"currency": currency,
		"amount": coin
	});

    controller.action("popup", { "display-unit":"S_QRCODE" });
}

function toggle_currency() {
	var data = {
		"amount-type": $data["amount-type"] === "KRW" ? "SBD" : "KRW"
	}

	view.data("display-unit", data);
	view.action("reload");
}


function on_change_amount() {
    if (__current_coin_price) {
        __update_coin_amount();
    }
}

function __update_coin_amount() {
	if ($data["amount-type"] === "KRW") {
		var currency_amount = parseFloat(view.object("amount").value() || "0");
        var coin_amount = (currency_amount / __current_coin_price).toFixed(3);

        view.object("label.amount.coin").property({ "text":coin_amount.toString() + " " +  "SBD" });
	}
}

function __get_coin_price(currency, coin, count, handler) {
	var url = "https://crix-api-endpoint.upbit.com/v1/crix/candles/days";
    var query = __query_for_candles(currency, coin, count);
    
    fetch(url+ "?" + query).then(function(response) {
        if (response.ok) {
            response.json().then(function(candles) {
                handler(candles[0]["tradePrice"]);
            });
        }
    }, function(reason) {
        hanlder();
    });
}

function __query_for_candles(currency, coin, count) {
    var params = {};
    
    params["code"] = "CRIX.UPBIT." + currency.toUpperCase() + "-" + coin.toUpperCase();
    params["count"] = count;
 
    return __to_query_string(params);
}

function __to_query_string(params) {
    return Object.keys(params).map(function(k) {
        return k + "=" + params[k];
    }).join('&')
}
