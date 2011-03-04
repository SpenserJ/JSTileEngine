for y in 0..9
  line = ""
  for x in 0..9
    line += '[' + x.to_s + ',' + y.to_s + '],'
  end
  puts '[' + line[0..-2] + "],\n"
end