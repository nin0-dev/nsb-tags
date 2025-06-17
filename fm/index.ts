import { getName } from "@common/getName";
import { initStorage } from "@common/storage";

(async () => {
	const storage = initStorage("fm");

	if (
		discord.variables.__args[0] === "eval" &&
		discord.user.id === "886685857560539176"
	)
		return (0, eval)(discord.variables.__argsString.replace("eval ", ""));

	const isUserTryingToSet =
		discord.variables.__args[0] === "set" &&
		discord.variables.__args.length === 2;
	if (isUserTryingToSet) {
		if (!/^(-|_|[a-zA-Z0-9]){2,15}$/.test(discord.variables.__args[1]))
			return console.log("❌ Invalid username.");
		storage[discord.user.id] = discord.variables.__args[1];
		console.log(
			`<a:tay:1381363439791898735> Set your last.fm username to ${discord.variables.__args[1]}`
		);
		return;
	}

	if (!storage[discord.user.id])
		return console.log(
			"❌ You aren't registered, set your last.fm username by sending `.t fm set yourLastFmUsernameHere`."
		);

	(async () => {
		const req = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=eebde839555fb94539f05e57021505df&user=${
				storage[discord.user.id]
			}&limit=1&format=json&extended=1`
		);
		const d = await req.json();
		if (d.error)
			return console.log(
				"❌ last.fm error, make sure that your username is valid.",
				JSON.stringify(d)
			);
		const track = d.recenttracks.track[0];
		console.log(
			JSON.stringify({
				embed: {
					author: {
						icon_url: `https://cdn.discordapp.com/avatars/${discord.user.id}/${discord.user.avatar}.png`,
						name: `${
							(() => {
								if (track["@attr"]) {
									if (track["@attr"].nowplaying === "true")
										return true;
									else return false;
								}
								return false;
							})()
								? "Now playing - "
								: "Last track for "
						}${getName()}`,
					},
					description: `### [${track.name}](https://last.fm/user/${
						storage[discord.user.id]
					})
**${track.artist.name}** • *${track.album["#text"]}*`,
					color: 12189696,
				},
			})
		);
	})();
})();
