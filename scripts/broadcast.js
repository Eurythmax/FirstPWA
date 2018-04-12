/**
 * Created by markushauthaler on 12.04.18.
 */
const broadcasts = [];

function broadcast(message) {
	for (let broadcast of broadcasts) {
		broadcast.postMessage(message);
	}
}

var isLoggedIn = false;

self.addEventListener(
	"connect",
	function(event) {
		var port = event.ports[0];
		broadcasts.push(port);

		port.addEventListener("message", function(event) {
			const { id, type } = event.data;

			switch (type) {
				case "changelogin":
					isLoggedIn = !isLoggedIn;

					if (isLoggedIn) {
						broadcast({ type: "login", id });
					} else {
						broadcast({ type: "logout", id });
					}
					break;
			}
		});

		port.start();

		broadcast({ type: "connect", id: broadcasts.length, isLoggedIn });
	},
	false
);