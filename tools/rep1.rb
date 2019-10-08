data = Hash.new

def sum(map)
	sum = 0
	for key, val in map
		sum += val
	end
	return sum
end

# File.open("/Users/alek/Downloads/SSI_email_TI_competitor") do |f|
File.open("/Users/alek/Downloads/SSI_email_TI_competitor_unfiltered_1") do |f|
	while (line = f.gets)
		parts = line.strip.split("\t")
		className = parts[1]
		categoryName = parts[2]
		companies = (parts[3] != nil) ? parts[3].split("|") : []
		key = className + "\t" + categoryName
		if !data[key]
			data[key] = Hash.new
		end
		for company in companies
			if !data[key][company]
				data[key][company] = 0
			end
			data[key][company] = data[key][company] + 1
		end
	end
end


data.sort_by{ |key, value| sum(value)}.reverse.each { |key, value|
	puts [key, sum(value), value].join("\t")
}