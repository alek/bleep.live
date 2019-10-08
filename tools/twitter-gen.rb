require 'json'

file = File.open "/Data/dataset/twitter/mydata/2/ad-impressions.js"

data = JSON.load file
for entry in data
	for adEntry in entry["ad"]
		# puts JSON.pretty_generate adEntry[1]["adImpressions"]["impressions"]
		# puts adEntry[1]["adImpressions"]["impressions"].length
		for ad in adEntry[1]["adImpressions"]["impressions"]
			if (ad["promotedTweetInfo"] != nil)
				# puts ad["promotedTweetInfo"]["tweetText"]
				# puts ad.keys.join("\t")
				# puts JSON.pretty_generate ad
				begin
					# puts [ad["impressionTime"], ad["deviceInfo"]["deviceType"], ad["displayLocation"], ad["promotedTweetInfo"]["tweetText"], ad["advertiserInfo"]["advertiserName"], ad["matchedTargetingCriteria"].map { |x| x["targetingType"] + ":" + x["targetingValue"] }.join(";")].join("\t")
					puts [ad["impressionTime"], ad["deviceInfo"]["deviceType"], ad["displayLocation"], ad["promotedTweetInfo"]["tweetText"], ad["advertiserInfo"]["advertiserName"], ad["matchedTargetingCriteria"].to_json].join("\t")
				rescue
				end
				# exit 1
			end
		end
	end
end