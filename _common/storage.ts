export function initStorage(name: string) {
	discord.storage.server[name] ??= "{}";
	return new Proxy(
		{},
		{
			get(_, prop) {
				const data = JSON.parse(discord.storage.server[name] || "{}");
				return data[prop];
			},
			set(_, prop, value) {
				const data = JSON.parse(discord.storage.server[name] || "{}");
				data[prop] = value;
				discord.storage.server[name] = JSON.stringify(data);
				return true;
			},
		}
	);
}
