# Release Notes - v0.1.1

## macOS Compatibility Fix

This release addresses the critical issue where macOS .app bundles would not launch after download.

### What's Fixed
- **macOS app now launches immediately** - No more crashes on startup
- Removed dependency on macOS private APIs that required code signing
- App now works without requiring Apple Developer certificate

### Installation (macOS)
1. Download the appropriate .app.tar.gz file for your Mac:
   - **Apple Silicon (M1/M2/M3):** `Seeva.AI.Assistant_darwin_aarch64.app.tar.gz`
   - **Intel:** `Seeva.AI.Assistant_darwin_x64.app.tar.gz`

2. Extract the archive (double-click or use `tar -xzf filename.tar.gz`)

3. Drag `Seeva AI Assistant.app` to your Applications folder

4. Launch the app:
   - Right-click the app and select "Open" (first time only)
   - Click "Open" in the security dialog
   - After first launch, you can open it normally

5. Use Cmd+Shift+C to show/hide the assistant

### Known Limitations
- Window may not stay on top of full-screen applications (will be fixed in v0.2.0 with proper code signing)
- For 90% of use cases (windowed apps), behavior is unchanged

### What's Coming in v0.2.0
- Proper Apple code signing and notarization
- Full "always on top" support for all applications
- Enhanced window management

### All Platforms Supported
- macOS (Apple Silicon & Intel)
- Windows
- Linux (Debian, AppImage, RPM)

---

**Questions or issues?** Open an issue at https://github.com/thisisharsh7/seeva-ai-assistant/issues
