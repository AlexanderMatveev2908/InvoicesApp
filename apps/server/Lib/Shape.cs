namespace InvoicesApp.LibNs;

public static class LibShape
{
  public static object Merge<T>(T dto, object extra)
  {
    Dictionary<string, object?> dict = [];

    foreach (var p in typeof(T).GetProperties())
      dict[p.Name] = p.GetValue(dto);

    foreach (var p in extra.GetType().GetProperties())
      dict[p.Name] = p.GetValue(extra);

    return dict;
  }
}