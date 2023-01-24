<?php
if(!isset($_SESSION)){

session_start();
date_default_timezone_set("America/Sao_Paulo");
set_time_limit(0);

}


//conexão com o banco de dados e itens necessários envio e-mail
include_once ('../controle/conexao.php');
require_once('../vendor/autoload.php');


// ---------------------------------------------------------
// ENVIAR WHATSAPP LEMBRETE - CONFIRMAÇÃO DE CADASTRO
// ---------------------------------------------------------



$query = "SELECT cel_principal FROM tab_ativar_cadastro_credenciado";
$result = mysqli_query($conn, $query);
$row = mysqli_num_rows($result);
//echo $row;exit; // - verifica no banco se é 0 = não existe é 1 = existe

if($row > 0){

while($row=$result->fetch_array()) {


//$cel = "(19) 99238-0690";
$cel = $row["cel_principal"];
$cel_principal = preg_replace("/[^0-9]/", '', $cel);


$mensagem_whatsapp = "Portal Saúde Fácil: Olá só lembrando que você ainda não ativou seu cadastro no Portal Saúde Fácil, verifique seu e-mail para ativação e assim não perder nenhuma oportunidade.";




$dados = '{

"number":"'.$cel_principal.'",
"menssage":"'.$mensagem_whatsapp.'"

}';


$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://v5.chatpro.com.br/chatpro-a8172ab660/api/v1/send_message', [
'body' => $dados,
'headers' => [
'Authorization' => '578b840e7280b808a217836f149b8def',
'accept' => 'application/json',
'content-type' => 'application/json',
],
]);

//echo $response->getStatusCode(); // retorna o código de sucesso ou erro
echo $response->getBody();


//chama a função para envio
//enviar_whatsapp($cel_principal,$mensagem_whatsapp);

}

}