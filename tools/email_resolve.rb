require 'json'
require 'httparty'

# load cache

cache = Hash.new
File.open("data/email_resolve.tsv") do |f|
	while (line = f.gets)
		parts = line.split("\t")
		cache[parts[0].strip] = true
	end
end

File.open("/Data/dataset/supplyframe/samacsys/pricing/new/emails") do |f|
	while (line = f.gets)
		email = line.strip

		if (cache[email] != true) 
			begin
				url = "https://apilayer.net/api/check?access_key=19b3f49f9ab4ba722c15ae0f3ea25c67&email=#{email}&smtp=1&format=1"
				response = HTTParty.get(url)
				puts [email + "\t" + response.parsed_response.to_json].join("\t")
			rescue
			end
		end

	end
end