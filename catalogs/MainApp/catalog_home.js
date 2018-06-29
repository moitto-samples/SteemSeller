
function show_popup() {
	controller.catalog().submit("showcase", "auxiliary", "S_CREATE_TRADING", {
		"has-own-sbml":"yes",
		"hides-navibar":"yes",
		"username":$data["subview.username"],
		"amount-type":"KRW"
	});

    controller.action("popup", { "display-unit":"S_CREATE_TRADING" });
}
