const { ex } = require('./common.js');

// Fifth line-by-line example for lessons that only had four.
module.exports = {
  'sql-1': [
    ex('Select specific columns and aliases', `SELECT name AS student_name,
       marks
FROM students;`, [['SELECT name AS student_name,', 'AS renames the column in the output header.'], ['marks', 'A second column, comma-separated.'], ['FROM students;', 'Rows come from this table only.']])
  ],
  'sql-2': [
    ex('BETWEEN, IN and LIKE', `SELECT name, city, marks
FROM students
WHERE marks BETWEEN 60 AND 90
   OR city IN ('Mumbai', 'Pune')
   OR name LIKE 'A%';`, [['WHERE marks BETWEEN 60 AND 90', 'Inclusive range test on numbers.'], ["OR city IN ('Mumbai', 'Pune')", 'IN is shorthand for many OR = checks.'], ["OR name LIKE 'A%'", '% matches any characters, so A* names.']])
  ],
  'sql-11': [
    ex('Pagination for infinite feeds', `SELECT id, title, created_at
FROM posts
ORDER BY created_at DESC, id DESC
LIMIT 10 OFFSET 20;`, [['ORDER BY created_at DESC, id DESC', 'A tiebreaker keeps pages stable.'], ['LIMIT 10', 'One page of 10 rows.'], ['OFFSET 20', 'Skips the first two pages.']])
  ],
  'go-1': [
    ex('Comments and gofmt discipline', `package main

import "fmt"

// greet returns a welcome line for one student.
func greet(name string) string {
	return "Namaste, " + name + "!"
}

func main() {
	fmt.Println(greet("Asha"))
}`, [['// greet returns a welcome line...', 'Documented comments start with the function name.'], ['return "Namaste, " + name + "!"', 'Strings join with +.'], ['fmt.Println(greet("Asha"))', 'Calls the function and prints the result.']])
  ],
  'rust-1': [
    ex('Comments and function shape', `fn greet(name: &str) -> String {
	// Build a welcome line and return it.
	format!("Namaste, {}!", name)
}

fn main() {
	println!("{}", greet("Asha"));
}`, [['fn greet(name: &str) -> String {', '-> String states the return type.'], ['format!("Namaste, {}!", name)', 'Macros need the ! and braces for values.'], ['println!("{}", greet("Asha"))', 'Calls greet and prints the returned string.']])
  ],
  'csharp-1': [
    ex('Comments and string interpolation', `// Entry point of a C# console app.
int age = 21;
Console.WriteLine("Age: " + age);
Console.WriteLine($"Next year: {age + 1}");`, [['// Entry point of a C# console app.', '// comments never execute.'], ['Console.WriteLine("Age: " + age);', '+ concatenates values into text.'], ['Console.WriteLine($"Next year: {age + 1}");', '$"..." interpolates expressions inline.']])
  ],
  'csharp-7': [
    ex('LINQ query syntax', `var marks = new[] { 92, 78, 65, 88 };

var top = from m in marks
          where m >= 80
          orderby m descending
          select m;

Console.WriteLine(string.Join(", ", top));`, [['from m in marks', 'Query syntax reads like SQL.'], ['where m >= 80', 'Filters before ordering.'], ['select m', 'Projects the result into a new sequence.']])
  ],
  'csharp-8': [
    ex('Tuples for multiple results', `static (int min, int max) Range(int[] xs)
{
    return (xs.Min(), xs.Max());
}

static void Main()
{
    var r = Range(new[] { 4, 9, 2 });
    Console.WriteLine($"{r.min}-{r.max}");
}`, [['static (int min, int max) Range(int[] xs)', 'Named tuple elements as the return type.'], ['return (xs.Min(), xs.Max());', 'Two values returned without a custom class.'], ['var r = Range(...)', 'r.min and r.max are named and typed.']])
  ],
  'csharp-9': [
    ex('Pattern matching switch expressions', `static string Fee(int age) => age switch
{
    < 5 => "Free",
    < 18 => "Half",
    >= 60 => "Senior discount",
    _ => "Full"
};

static void Main() => Console.WriteLine(Fee(65));`, [['age switch', 'Expression-bodied switch on one value.'], ['< 5 => "Free"', 'Relational patterns replace many if branches.'], ['_ => "Full"', 'The discard pattern is the required default.']])
  ],
  'csharp-10': [
    ex('Span<T> for slicing', `string card = "4111111111111111";
ReadOnlySpan<char> last4 = card.AsSpan()[^4..];
Console.WriteLine(last4.ToString());`, [['ReadOnlySpan<char> last4 = card.AsSpan()', 'A view over the string with no copying.'], ['[^4..]', 'Ranges: ^4 counts from the end.'], ['Console.WriteLine(last4.ToString())', 'Converts the slice back to text.']])
  ],
  'csharp-11': [
    ex('Minimal API endpoint', `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run("http://localhost:5000");`, [['var builder = WebApplication.CreateBuilder(args);', 'Boots configuration and DI.'], ['app.MapGet("/health", ...)', 'Maps a URL to a handler returning JSON.'], ['app.Run("http://localhost:5000");', 'Starts listening and blocks.']])
  ],
  'csharp-12': [
    ex('xUnit test with three parts', `public class FeeTests
{
    [Fact]
    public void Senior_Gets_Discount()
    {
        // Arrange
        int age = 65;
        // Act
        string fee = Program.Fee(age);
        // Assert
        Assert.Equal("Senior discount", fee);
    }
}`, [['[Fact]', 'Marks the method as a runnable test.'], ['int age = 65; // Arrange', 'Set up the input.'], ['Assert.Equal("Senior discount", fee);', 'Compare actual to expected.']])
  ]
};
