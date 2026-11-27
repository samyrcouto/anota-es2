import re, sys
def blocks(src):
    lines = src.split('\n'); out = []; i = 0
    while i < len(lines):
        if lines[i].startswith('  { d:'):
            j = i + 1
            while j < len(lines) and not lines[j].startswith('  { d:') and not lines[j].startswith(']);'): j += 1
            out.append((i, j)); i = j
        else: i += 1
    return lines, out
def find(src, anchor, sec=None):
    lines, bl = blocks(src)
    for i, j in bl:
        if f"a: '{anchor}'" in lines[i] or (anchor is None and "a: null" in lines[i]): return lines, i, j
    raise SystemExit('anchor not found: ' + str(anchor))
def insert_before(src, anchor, code):
    lines, i, j = find(src, anchor); lines[i:i] = code.rstrip('\n').split('\n'); return '\n'.join(lines)
def replace(src, anchor, code):
    lines, i, j = find(src, anchor); lines[i:j] = code.rstrip('\n').split('\n'); return '\n'.join(lines)
