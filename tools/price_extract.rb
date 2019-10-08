require 'json'

res = Hash.new

File.open("/Data/git/bleep.hdi/data/backup4/price_resolve.tsv") do |f|
	while (line = f.gets)
		parts = line.strip.split("\t")
		part = parts[0]
		data = JSON.parse(parts[1])
		if (data["response"].length > 0) 
			if (data["response"][0]["parts"][0]["price"].length > 0)
				# puts data["response"][0]["parts"][0]["price"][0]["price"]
				# res[part] = data["response"][0]["parts"][0]["price"]
				res[part] = data["response"][0]["parts"][0]["price"][0]["price"]
			end
			# exit 1
		end
	end
end

puts res.to_json