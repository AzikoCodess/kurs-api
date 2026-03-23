import os

# Qaysi papkalarni o'tkazib yuborish kerak (keraksizlar)
IGNORE_DIRS = {'.git', '.idea', '.dart_tool', 'build', 'ios', 'android', 'web', 'linux', 'macos', 'node_modules'}

# Qaysi aniq fayllarni butunlay o'tkazib yuborish kerak
IGNORE_FILES = {'package-lock.json'} 

# Qaysi formatdagi fayllarni olish kerak
EXTENSIONS = {'.dart', '.yaml', '.js', '.env', '.rules', '.json'} 

def merge_project_files(output_file='loyiha_kodi.txt'):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        # Hozirgi papkadan boshlab qidiradi
        for root, dirs, files in os.walk('.'):
            # Keraksiz papkalarni o'chirib tashlaymiz
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                # Agar fayl nomi keraksiz fayllar ro'yxatida bo'lsa, uni o'tkazib yuboramiz
                if file in IGNORE_FILES:
                    continue
                
                if any(file.endswith(ext) for ext in EXTENSIONS):
                    file_path = os.path.join(root, file)
                    
                    # Fayl yo'lini yozamiz (Strukturani tushunish uchun muhim)
                    outfile.write(f"\n\n{'='*50}\n")
                    outfile.write(f"FILE: {file_path}\n")
                    outfile.write(f"{'='*50}\n\n")
                    
                    # Fayl ichini o'qib yozamiz
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"Faylni o'qishda xatolik: {e}\n")

    print(f"Tayyor! Barcha kodlar '{output_file}' fayliga saqlandi.")

if __name__ == "__main__":
    merge_project_files()