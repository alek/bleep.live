require 'json'

emails = JSON.load(File.open("data/email_metadata.js"))
prices = JSON.load(File.open("data/part_price.js"))
ccVolume = JSON.load(File.open("data/classcat_volume.js"))

def getVolumeEstimate(className, categoryName, ccVolume) 
	for entry in ccVolume
		if (entry["className"] == className && entry["categoryName"] == categoryName)
			return entry["distribution"][2].to_f
		end
	end
	for entry in ccVolume
		if (entry["categoryName"] == categoryName)
			return entry["distribution"][2].to_f
		end
	end
	for entry in ccVolume
		if (entry["className"] == className)
			return entry["distribution"][2].to_f
		end
	end
	return 1
end


# for key,val in emails
# 	puts val["score"]
# end

File.open("/Data/dataset/supplyframe/samacsys/pricing/new/model_full_clean.tsv") do |f|
	while (line = f.gets)
		parts = line.strip.split("\t")
		part = parts[6]
		fullName = parts[14]
		email = parts[15]
		partClass = parts[10]
		partCategory = parts[11]
		if (prices[part] and emails[email])
			# puts [part, prices[part], emails[email]["score"]].join("\t")
			# puts [prices[part], prices[part]*getVolumeEstimate(partClass, partCategory, ccVolume), emails[email]["score"]].join("\t")
			puts [prices[part]*getVolumeEstimate(partClass, partCategory, ccVolume), emails[email]["score"]].join("\t")
		end
	end
end