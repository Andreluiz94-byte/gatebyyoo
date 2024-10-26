const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const urlModule = require("url");

async function downloadPage(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Diretórios locais para CSS, JS, imagens e vídeos
    if (!fs.existsSync("imagens")) fs.mkdirSync("imagens");
    if (!fs.existsSync("css")) fs.mkdirSync("css");
    if (!fs.existsSync("js")) fs.mkdirSync("js");
    if (!fs.existsSync("videos")) fs.mkdirSync("videos"); // Pasta para vídeos

    // Acumula o conteúdo de todos os arquivos CSS para salvar em um único arquivo
    let allCssContent = "";

    // Baixa e concatena o CSS externo em um único arquivo
    const cssPromises = $("link[rel='stylesheet']")
      .map(async (i, element) => {
        const cssUrl = $(element).attr("href");
        if (cssUrl) {
          const cssPath = urlModule.resolve(url, cssUrl);
          try {
            const cssResponse = await axios.get(cssPath);
            allCssContent += cssResponse.data + "\n";
            console.log(`Arquivo CSS baixado e adicionado: ${cssUrl}`);
          } catch (error) {
            console.error(`Erro ao baixar CSS ${cssUrl}:`, error.message);
          }
        }
      })
      .get();

    await Promise.all(cssPromises);
    fs.writeFileSync(path.join("css", "styles.css"), allCssContent);
    $("link[rel='stylesheet']").remove();
    $("head").append('<link rel="stylesheet" href="css/styles.css">');

    // Baixa cada imagem encontrada no HTML
    const imagePromises = $("img, link[rel='icon']")
      .map(async (i, element) => {
        const imageUrl = $(element).attr("src") || $(element).attr("href");
        if (imageUrl) {
          const fullImageUrl = urlModule.resolve(url, imageUrl);
          const imageName = path.basename(fullImageUrl);
          const imagePath = path.join("imagens", imageName);

          try {
            const imageResponse = await axios.get(fullImageUrl, {
              responseType: "arraybuffer",
            });
            fs.writeFileSync(imagePath, imageResponse.data);
            console.log(`Imagem salva: ${imagePath}`);

            if ($(element).is("img")) {
              $(element).attr("src", `imagens/${imageName}`);
            } else if ($(element).is("link[rel='icon']")) {
              $(element).attr("href", `imagens/${imageName}`);
            }
          } catch (error) {
            console.error(`Erro ao baixar imagem ${imageUrl}:`, error.message);
          }
        }
      })
      .get();

    await Promise.all(imagePromises);

    // Baixa e salva cada script externo
    const scriptPromises = $("script[src]")
      .map(async (i, element) => {
        const scriptUrl = $(element).attr("src");
        if (scriptUrl) {
          const fullScriptUrl = urlModule.resolve(url, scriptUrl);
          const scriptFileName = `script_${i}.js`;
          const scriptPath = path.join("js", scriptFileName);

          try {
            const scriptResponse = await axios.get(fullScriptUrl);
            fs.writeFileSync(scriptPath, scriptResponse.data);
            console.log(`Arquivo JS salvo: ${scriptPath}`);

            // Atualiza o caminho do script no HTML para o caminho local
            $(element).attr("src", `js/${scriptFileName}`);
          } catch (error) {
            console.error(`Erro ao baixar JS ${scriptUrl}:`, error.message);
          }
        }
      })
      .get();

    await Promise.all(scriptPromises);

    // Baixa e salva cada vídeo encontrado na página
    const videoPromises = $("video, source")
      .map(async (i, element) => {
        const videoUrl = $(element).attr("src");
        if (videoUrl) {
          const fullVideoUrl = urlModule.resolve(url, videoUrl);
          const videoName = path.basename(fullVideoUrl);
          const videoPath = path.join("videos", videoName);

          try {
            const videoResponse = await axios.get(fullVideoUrl, {
              responseType: "arraybuffer",
            });
            fs.writeFileSync(videoPath, videoResponse.data);
            console.log(`Vídeo salvo: ${videoPath}`);

            // Atualiza o caminho do vídeo no HTML para o caminho local
            $(element).is("video") &&
              $(element).attr("src", `videos/${videoName}`);
          } catch (error) {
            console.error(`Erro ao baixar vídeo ${videoUrl}:`, error.message);
          }
        }
      })
      .get();

    await Promise.all(videoPromises);

    // Salva o HTML atualizado em pagina.html
    fs.writeFileSync("pagina.html", $.html());
    console.log("HTML, CSS, JS, imagens e vídeos baixados com sucesso.");
  } catch (error) {
    console.error("Erro ao baixar a página:", error.message);
  }
}

// Executa a função com a URL desejada
downloadPage(
  "https://gatebyyoo.com.br/?gad_source=1&gclid=Cj0KCQjwyL24BhCtARIsALo0fSBp7Q57iSFX8XxlGFiT7JxFmzSJUPnH3GbLX59l1svfBPQxXoHby0QaArBOEALw_wcB#"
);
