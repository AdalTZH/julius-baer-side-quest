# Server Setup using Java
## 📋 What You Need

You need **Java 17** installed to run the Core Banking API. This guide shows you how to install it on your computer.

## ☕ Java Installation

### 🍎 **macOS Installation**

#### **Option 1: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java 17
brew install openjdk@17

# Add to PATH (add this to your ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### **Option 2: Direct Download with curl**
```bash
# Create Java directory
sudo mkdir -p /Library/Java/JavaVirtualMachines

# Download OpenJDK 17 for macOS (ARM64 - Apple Silicon)
curl -L -o openjdk-17.tar.gz "https://download.java.net/java/GA/jdk17.0.2/dfd4a8d0985749f896bed50d7138ee7f/8/GPL/openjdk-17.0.2_macos-aarch64_bin.tar.gz"

# For Intel Macs, use this instead:
# curl -L -o openjdk-17.tar.gz "https://download.java.net/java/GA/jdk17.0.2/dfd4a8d0985749f896bed50d7138ee7f/8/GPL/openjdk-17.0.2_macos-x64_bin.tar.gz"

# Extract and install
tar -xzf openjdk-17.tar.gz
sudo mv jdk-17.0.2.jdk /Library/Java/JavaVirtualMachines/

# Set JAVA_HOME (add to ~/.zshrc or ~/.bash_profile)
echo 'export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-17.0.2.jdk/Contents/Home"' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Clean up
rm openjdk-17.tar.gz
```

#### **Option 3: Using SDKMAN (Developer Friendly)**
```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source ~/.sdkman/bin/sdkman-init.sh

# Install Java 17
sdk install java 17.0.2-open
sdk use java 17.0.2-open
```

### 🪟 **Windows Installation**

#### **Option 1: Using Chocolatey (Recommended)**
```powershell
# Install Chocolatey (run as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install OpenJDK 17
choco install openjdk17
```

#### **Option 2: Direct Download with PowerShell**
```powershell
# Create Java directory
New-Item -ItemType Directory -Force -Path "C:\Program Files\Java"

# Download OpenJDK 17 for Windows
Invoke-WebRequest -Uri "https://download.java.net/java/GA/jdk17.0.2/dfd4a8d0985749f896bed50d7138ee7f/8/GPL/openjdk-17.0.2_windows-x64_bin.zip" -OutFile "openjdk-17.zip"

# Extract (you may need 7-Zip or built-in Windows extraction)
Expand-Archive -Path "openjdk-17.zip" -DestinationPath "C:\Program Files\Java\"

# Set Environment Variables (run as Administrator)
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17.0.2", "Machine")
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Program Files\Java\jdk-17.0.2\bin", "Machine")

# Clean up
Remove-Item "openjdk-17.zip"
```

#### **Option 3: Using curl (if available)**
```bash
# If you have curl installed on Windows (Git Bash, WSL, etc.)
curl -L -o openjdk-17.zip "https://download.java.net/java/GA/jdk17.0.2/dfd4a8d0985749f896bed50d7138ee7f/8/GPL/openjdk-17.0.2_windows-x64_bin.zip"

# Extract to C:\Program Files\Java\jdk-17.0.2
# Set JAVA_HOME=C:\Program Files\Java\jdk-17.0.2
# Add C:\Program Files\Java\jdk-17.0.2\bin to PATH
```

#### **Option 4: Manual Environment Variable Setup (Windows)**
```batch
# Add to System Environment Variables:
# JAVA_HOME = C:\Program Files\Java\jdk-17.0.2
# PATH = %PATH%;%JAVA_HOME%\bin

# Or use Command Prompt (run as Administrator):
setx JAVA_HOME "C:\Program Files\Java\jdk-17.0.2" /M
setx PATH "%PATH%;%JAVA_HOME%\bin" /M
```

## 🔍 Verify Java Installation

After installation, **restart your terminal/command prompt** and verify:

```bash
# Check Java version
java -version

# Expected output:
# openjdk version "17.0.2" 2022-01-18
# OpenJDK Runtime Environment (build 17.0.2+8-Ubuntu-120.04)
# OpenJDK 64-Bit Server VM (build 17.0.2+8-Ubuntu-120.04, mixed mode, sharing)

# Check Java compiler
javac -version

# Expected output:
# javac 17.0.2

# Check JAVA_HOME (Unix/Mac)
echo $JAVA_HOME

# Check JAVA_HOME (Windows)
echo %JAVA_HOME%
```


## Running the Banking API Server

### **1. Get the JAR file**
Your instructor will provide: `core-banking-api.jar`

### **2. Start the server**
```bash
java -jar core-banking-api.jar
```

### **3. Test it works**
```bash
# Test the API (in a new terminal)
curl http://localhost:8080/accounts

# Expected response: JSON with account data
```



## 🐛 Troubleshooting

### **Common Issues**

#### **"java: command not found"**
- **Solution**: Java is not in PATH. Re-run the PATH setup commands and restart terminal.
- **Check**: `echo $PATH` (Unix) or `echo %PATH%` (Windows) should include Java bin directory.

#### **"JAVA_HOME not set"**
- **Solution**: Set JAVA_HOME environment variable as shown above.
- **Check**: `echo $JAVA_HOME` should point to Java installation directory.

#### **"Port 8080 already in use"**
- **Solution**: Kill the process using port 8080 or change port:
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8080   # Windows (find PID and kill)

# Or run on different port
java -Dserver.port=8081 -jar core-banking-api.jar
```

### **Verify Setup Checklist**
- [ ] Java 17 installed and in PATH
- [ ] `java -version` shows version 17.x.x
- [ ] JAVA_HOME environment variable set
- [ ] JAR file downloaded
- [ ] Application starts with `java -jar core-banking-api.jar`
- [ ] API responds to `curl http://localhost:8080/accounts`

## 📚 Additional Resources

### **API Testing Tools**
- **curl** - Command line HTTP client (included in most systems)
- **Postman** - GUI API testing tool

## 🎯 Quick Start Summary

### **Minimum Steps to Get Running**

1. **Install Java 17**:
   ```bash
   # macOS with Homebrew
   brew install openjdk@17
   
   # Windows with Chocolatey  
   choco install openjdk17
   ```

2. **Get JAR file**:
   Get `core-banking-api.jar` from your instructor

3. **Run Application**:
   ```bash
   java -jar core-banking-api.jar
   ```

4. **Test API**:
   ```bash
   curl http://localhost:8080/accounts
   ```

That's it! The Core Banking API should now be running on `http://localhost:8080` 🚀

## 💡 Pro Tips

- **Restart terminal** after setting environment variables
- **Check Java version** with `java -version` before running
- **Read logs** if application fails to start - they usually show the exact issue
- **Port conflicts** - use `java -Dserver.port=8081 -jar core-banking-api.jar` to run on different port

Happy coding! 🎉
