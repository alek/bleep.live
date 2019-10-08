require 'json'

data = Hash.new

# File.open("/Data/dataset/supplyframe/samacsys/pricing/new/model_full_clean.tsv") do |f|
File.open("/Data/dataset/supplyframe/samacsys/pricing/new/model_us.tsv") do |f|
	while (line = f.gets)
		parts = line.strip.split("\t")
		mfg = parts[7]
		user = parts[15]
		if !data[user]
			data[user] = Hash.new
		end
		if !data[user][mfg]
			data[user][mfg] = 0
		end
		data[user][mfg] += 1
		# puts [mfg, user].join("\t")
		# exit 1
	end
end

# puts data.keys

# data.each { |user, val|
# 	val.each { |mfg, count|
# 		puts [user, mfg, count].join("\t")
# 	}
# }

# puts data.to_json