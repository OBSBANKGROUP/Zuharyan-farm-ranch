#!/usr/bin/env python3
import sys

def main():
    # This is a harmless placeholder so platforms that auto-run
    # Django management commands (looking for manage.py) will not fail.
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        print(f"Placeholder manage.py received command: {cmd}. Exiting gracefully.")
    else:
        print("Placeholder manage.py called with no args. Exiting gracefully.")
    # Exit with success so build steps depending on manage.py won't error.
    sys.exit(0)


if __name__ == '__main__':
    main()
