require 'json'
res = Hash.new

File.open("/Data/git/bleep.hdi/data/backup3/email_resolve.tsv") do |f|
	while (line = f.gets)
		parts = line.strip.split("\t")
		email = parts[0]
		data = JSON.parse(parts[1])
		# puts [email, data["free"]].join("\t")
		# puts data["free"]
		# puts [data["free"], data["score"]].join("\t")
		res[email] = {
			"score" => data["score"],
			"free" => data["free"],
			"disposable" => data["disposable"]
		}
	end
end

puts JSON.pretty_generate res