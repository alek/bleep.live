require 'json'

File.open("data/classcat_dist.tsv") do |f|
	vals = []
	f.gets
	while (line = f.gets)
		parts = line.strip.split("\t")
		entry = {
			"className" => parts[0],
			"categoryName" => parts[1],
			"distribution" => parts[2..-1]
		}
		vals << entry
	end
	puts JSON.pretty_generate(vals)
end