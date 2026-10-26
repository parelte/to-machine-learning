Set sh = CreateObject("WScript.Shell")
Set fs = CreateObject("Scripting.FileSystemObject")
folder = fs.GetParentFolderName(WScript.ScriptFullName)
icon = folder & "\logo.ico"

Set l = sh.CreateShortcut(sh.SpecialFolders("Desktop") & "\To Machine Learning.lnk")
l.TargetPath = sh.ExpandEnvironmentStrings("%ComSpec%")
l.Arguments = "/c """ & folder & "\start.bat"""
l.WorkingDirectory = folder
If fs.FileExists(icon) Then l.IconLocation = icon & ",0"
l.Description = "Jalankan To Machine Learning"
l.Save

MsgBox "Pintasan To Machine Learning sudah dibuat di Desktop." & vbCrLf & vbCrLf & "Klik kanan pintasan itu, lalu pilih Show more options > Pin to taskbar (atau Sematkan ke bilah tugas)." & vbCrLf & vbCrLf & "Jika ikon belum berubah, tekan F5 di Desktop atau mulai ulang Explorer.", 64, "To Machine Learning"
