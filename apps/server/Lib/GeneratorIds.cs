namespace InvoicesApp.LibNS;

public static class GeneratorIds
{
  private static readonly Random Rnd = new();

  public static string Main()
  {
    char a = (char)Rnd.Next('A', 'Z' + 1);
    char b = (char)Rnd.Next('A', 'Z' + 1);

    int num = Rnd.Next(1000, 10000);

    return $"{a}{b}{num}";
  }

}