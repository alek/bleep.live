require 'json'
require 'httparty'

File.open("/Data/dataset/supplyframe/samacsys/pricing/new/parts") do |f|
	while (line = f.gets)
		part = line.strip
		begin
			url = "http://api.findchips.com/v1/search?apiKey=m79wo9S4nrsxG&part=#{part}&hostedOnly=true"
			response = HTTParty.get(url)
			puts [part + "\t" + response.parsed_response.to_json].join("\t")
		rescue
		end
		sleep 0.5
	end
end