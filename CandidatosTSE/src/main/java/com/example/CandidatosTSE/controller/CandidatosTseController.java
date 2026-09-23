package com.example.CandidatosTSE.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import com.example.CandidatosTSE.model.Candidato;
import java.util.List;

import com.example.CandidatosTSE.service.CandidatosTseService;

@Controller 
public class CandidatosTseController{
    private final CandidatosTseService candidadosTseService;

    public CandidatosTseController(CandidatosTseService candidatosTseService){
        this.candidadosTseService = candidatosTseService;
    }

    @GetMapping("/")
    public String index(
        @RequestParam(required = false) String cargo,
        @RequestParam(required = false) String partido,
        @RequestParam(required = false) String texto,
        Model model){

            List<Candidato> candidatos = candidadosTseService.filtrar(cargo, partido, texto);
            List<String> cargos = candidadosTseService.listarCargos();
            List<String> partidos = candidadosTseService.listarPartidos();
            int total = candidatos.size();
            model.addAttribute("candidatos", candidatos);
            model.addAttribute("cargos", cargos);
            model.addAttribute("partidos", partidos);
            model.addAttribute("total", total);
            model.addAttribute("cargoSelecionado", cargo);
            model.addAttribute("partidoSelecionado", partido);

            return "index";
        }

}
