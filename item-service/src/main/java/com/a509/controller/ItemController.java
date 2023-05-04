package com.a509.controller;

import com.a509.dto.ItemResponseDto;
import com.a509.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<ItemResponseDto>> searchItemList(){
        List<ItemResponseDto> responseDto = itemService.searchItemList();
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("/item")
    public ResponseEntity<ItemResponseDto> searchItem(@RequestParam("id") Long itemId){
        ItemResponseDto responseDto = itemService.searchItem(itemId);
        return ResponseEntity.ok().body(responseDto);
    }
}
