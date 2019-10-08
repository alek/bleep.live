require 'json'

File.open("/Data/dataset/wikipedia/wiki-articles-1000.json") do |f|
	while (line = f.gets)
		entry = JSON.parse(line.strip)
		puts [entry["title"], entry["url"], entry["body"].gsub(/[^[:print:]]/,'.')].join("\t")
	end
end